export const listeners = [];

/**
 * 唯一的事件处理函数。使用此函数分发事件。
 * @param {Object} changedItems
 * @param {String} area
 */
export function onStorageChanged( changedItems , area ) {
  const changedNewValue = {};

  for ( let key in changedItems ) {
    changedNewValue[ key ] = changedItems[ key ].newValue;
  }

  listeners.forEach( ( realListener ) => {
    realListener( changedNewValue , area );
  } );
}

chrome.storage.onChanged.addListener( onStorageChanged );

const {isArray} = Array;

/**
 * 监听 chrome storage 的变化
 * @param {String|String[]} keys
 * @param {String|String[]} [areas]
 * @param {Function} listener
 * @returns {Function} - 调用这个函数可以删除此监听函数
 */
export default function ( keys , areas , listener ) {
  const _keys = isArray( keys ) ? keys : [ keys ];

  let _areas , _listener;
  if ( 3 === arguments.length ) {
    _areas = isArray( areas ) ? areas : [ areas ];
    _listener = listener;
  } else {
    _listener = areas;
  }

  function realListener( changes , area ) {

    // 如果产生事件的区域不在监听的区域列表里则直接返回
    if ( Array.isArray( _areas ) ) {
      if ( !_areas.includes( area ) ) {
        return;
      }
    }

    // 仅包含监听的键
    const myChanges = {};

    for ( let key in changes ) {
      if ( _keys.includes( key ) ) {
        myChanges[ key ] = changes[ key ];
      }
    }

    // myChanges 对象不是空的则调用监听函数
    for ( let hasMyChange in myChanges ) {
      _listener( myChanges , area );
      break;
    }
  }

  listeners.push( realListener );

  return ()=> listeners.splice( listeners.indexOf( realListener ) , 1 );
}

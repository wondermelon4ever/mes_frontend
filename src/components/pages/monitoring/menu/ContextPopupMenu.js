import ContextMenu from 'tui-context-menu';
import 'tui-context-menu/dist/tui-context-menu.css';

var contextMenu;

class ContextPopupMenu {

    constructor() {
        this.register   = this.register.bind(this);
        this.unregister = this.unregister.bind(this);
    }

    register(source, target, callback, menuItems) {
        contextMenu = new ContextMenu(document.querySelector('#'+source));
        contextMenu.register('#'+target, callback, menuItems);
    }

    unregister(source) {
        // var contextMenu = new ContextMenu(document.querySelector('#'+source));
        if(contextMenu !== undefined) contextMenu.unregister(document.querySelector('#'+source));
    }
}

// popup menu: find, view (tooltip, menubar), presets
const makePopupMenu = (objName, targetName, handlePopupClick) => {
    var items = [];
    items.push({
        title: 'Trace',
        menu: [
            {title: 'Show pathes moved', command: 'show.moving.history'},
            {title: 'Hide trace', command: 'hide.moving.line'},
            {title: 'Show pathes future', command: 'show.path.future'},
            {title: 'Clear history', command: 'clear.moving.history'}
        ]
    });
    items.push({
        title: 'Mission',
        menu: [
            {title: 'Show current', command: 'show.mission.current'},
            {title: 'Show hsitory', command: 'show.mission.hisstory'},
            {title: 'Clear hsitory', command: 'show.mission.hisstory'}
        ]
    });
    items.push({separator: true});
    items.push({
        title: 'Operator Action',
        menu: [
            {title: 'Manual Mode', command: 'operator.action.manualMode'},
            {title: 'Auto Mode',   command: 'operator.action.autoMode'},
            {title: 'Pause On',    command: 'operator.action.pause.on'},
            {title: 'Pause Off',   command: 'operator.action.pause.off'},
        ]
    });
    items.push({separator: true});
    items.push({
        title: 'Test',
        menu: [
            {title: 'Test vehicle moving x east', command: 'test.vehicle.move.x.east'},
            {title: 'Test vehicle moving x west', command: 'test.vehicle.move.x.west'},
            {title: 'Test vehicle moving y north', command: 'test.vehicle.move.y.north'},
            {title: 'Test vehicle moving y south', command: 'test.vehicle.move.y.south'},
        ]
    });
    items.push({separator: true});
    items.push({title: 'Options', disable: true});
    items.push({title: 'Diabled', disable: true});
    items.push({separator: true});
    items.push({title: 'Close', command: "close" });

    var popmenu = new ContextPopupMenu();
    popmenu.register("popupmenu", targetName, (e, cmd) => { handlePopupClick(e, cmd, objName); }, items);
    return popmenu;
}

export default makePopupMenu;

import React from 'react'
import Toolbar from 'react-big-calendar/lib/Toolbar'

class CalendarToolbar extends Toolbar {
    render() {
        return (
            <div>
                <div className="rbc-btn-group">
                    <button type="button" onClick={() => this.navigate('PREV')}>
                        <div className="icon icon-left-open"></div>
                        <div className="sr-only">Back</div>
                    </button>
                    <div className="rbc-toolbar-label">{this.props.label}</div>
                    <button type="button" onClick={() => this.navigate('NEXT')}>
                        <div className="icon icon-right-open"></div>
                        <div className="sr-only">Next</div>
                    </button>
                </div>
            </div>
        );
    }
}

export default CalendarToolbar
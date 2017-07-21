import React from 'react';
import ReactDOM from 'react-dom';

class ListObserver {
    
    constructor( observable ) {
        
        this.observable = observable;
        this.subscribers = [];
    }
    
    addSubscriber( subscriber ) {
        
        this.subscribers.push( subscriber );
    }
    
    addItem( item ) {
        
        this.observable.push( item );
        
        this.subscribers.forEach( subscriber =>
        
            subscriber.forceUpdate()
        );
    }
}


let globalList = [ 'item 1', 'item 2', 'item 3' ];
let listObserver = new ListObserver( globalList );
window.listObserver = listObserver;

class App extends React.Component {

    render() {
        
        return (
            
            <div id="app">
                <h1>Observers</h1>
                <MyList1 />
                <MyList2 />
                <MyList3 />
                <MyAddButton />
            </div>
        )
    }
}

class MyList1 extends React.Component {
    
    constructor() {
        
        super();
        listObserver.addSubscriber( this );
    }
    
    render() {
        
        return (
            <ul className="my-list">
            {
                globalList.map( item => 
                    
                    <li key={ item }>{ item }</li>
                )
            }
            </ul>
        )
    }
}

class MyList2 extends React.Component {
    
    constructor() {
        
        super();
        listObserver.addSubscriber( this );
    }
    
    
    render() {
        
        return (
            <ul className="my-list">
            {
                globalList.map( item => 
                    
                    <li key={ item }>{ item }</li>
                )
            }
            </ul>
        )
    }
}

class MyList3 extends React.Component {
    
    render() {
        
        return (
            <ul className="my-list">
            {
                globalList.map( item => 
                    
                    <li key={ item }>{ item }</li>
                )
            }
            </ul>
        )
    }
}

class MyAddButton extends React.Component {
    
    handleClick() {
        
        let item = Math.random().toString();
        listObserver.addItem( item );
    }
    
    render() {
        
        return <button onClick={ this.handleClick }>Add an item</button>
    }
}


ReactDOM.render(
    <App />,
    document.getElementById( 'root' )
)
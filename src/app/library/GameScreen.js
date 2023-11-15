import React from 'react'

export default function GameScreen(props) {
    return (
        <div style={props.style} className="game-screen">
            {props.children}
        </div>
    )
}
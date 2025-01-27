import React from 'react'

interface Props {
    text: string;
    onClick?: () => void
    className?: string;
}
export function Button(props): JSX.Element {
    return (
        <button onClick={props.onClick} className={props.className}>{props.text}</button>
    )
}
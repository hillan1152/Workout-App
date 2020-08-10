import React from 'react'

export default function Board(props) {
  const drop = e => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData('card_id');
    const card = document.getElementById(card_id);

    card.style.display = 'block';

    e.target.appendChild(card);
  }

  const dragOver = e => {
    e.preventDefault();
    
  }
  return (
    <div>
      {props.children}
    </div>
  )
}

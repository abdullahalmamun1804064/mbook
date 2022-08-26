import React from 'react'


const Liker = ({data,likes}) => {
  return (
    <span style={{ color: "var(--gray)", fontSize: "12px" }}>
     <span> {likes}</span>
      likes
    </span>
  );
}

export default Liker
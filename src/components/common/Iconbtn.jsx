import React from 'react'

const Iconbtn = ({
    text,onclick,children,disabled,customclasses,type
}) => {

  return (
   <button onClick={onclick} disabled={disabled}  className={`${customclasses}`} type={type}>
    {
        children?
        (<>
         {children}
        <span>
            {text}
        </span>
        </>
        ):(<span>
            {text}
        </span>)
    }
   </button>
  )
}

export default Iconbtn;

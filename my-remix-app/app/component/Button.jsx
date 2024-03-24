import React, { useEffect } from 'react'
import { useLocation } from "@remix-run/react";


export const Button = (data) => {
  const location = useLocation();
useEffect(()=>{
  console.log(location);
}, [])

  const {
    children,
    size="medium",
    textAlign="center",
    fullWidth,
    icon,
    tone,
    variant="econdary",
    id,
    url,
    disabled,
    loading,
    pressed,
    accessibilityLabel,
    type = "button",
    ...props
  } = data


  

  const dynamicClassName = variant ? `Polaris-Button--variant${variant}` : '';

  return (
    <button className={`Polaris-Button  Polaris-Button--size${size} Polaris-Button--textAlign${textAlign} ${dynamicClassName}`}
     {...props}>{children}</button>
  )
}


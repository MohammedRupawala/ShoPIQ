import React from 'react'

const Loader = () => {
  return (
    <div>Loading.....</div>
  )
}
type skeletonProps = {
  width?:string,
  length : number
}
export const SkeletonLoading = ({width = "unset",length}:skeletonProps)=>{
  const skeleton = Array.from({length},(v,idx)=>(<div className="skeleton-shape" key={idx}></div>))
return (<div className="skeleton-loader" style={{width}}>
  {skeleton}
</div>)
}

export default Loader
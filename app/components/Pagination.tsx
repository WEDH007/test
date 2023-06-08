'use client'

import { useState } from 'react'
import PageBtn from './PageBtn'

type Props = {
  
}

const Pagination = () => {
  const [firstPage, setFirstPages] = useState(1)

  const pageButtons = 5;
  return (
    <div>
      <PageBtn pagenumber={firstPage}/>
      <PageBtn pagenumber={firstPage + 1}/>
      <PageBtn pagenumber={firstPage + 2}/>
      <PageBtn pagenumber={firstPage + 3}/>
      <PageBtn pagenumber={firstPage + 4}/>
    </div>
  )
}

export default Pagination
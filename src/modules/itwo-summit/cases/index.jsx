import React, {useState, useEffect} from 'react'
import CaseTable from './case-table/'
import '../../../assets/css/case.css'
import { CaseItems } from '../../../components/utils/case-list'

const Cases = () => {
  const [caseList, setCaseList] = useState([])

  useEffect(() => {
  setCaseList(CaseItems)
  }, [CaseItems])
  
  return (
    <div >
     <CaseTable caselist={caseList} setCaseList={setCaseList}/>
    </div>
  )
}

export default Cases
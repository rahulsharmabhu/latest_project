import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"
import { Badge } from 'reactstrap'
import Profile1 from '../../../assets/images/portrait/small/avatar-s-1.jpg'
import Profile2 from '../../../assets/images/portrait/small/avatar-s-4.jpg'
import Profile3 from '../../../assets/images/portrait/small/avatar-s-5.jpg'
import Profile4 from '../../../assets/images/portrait/small/avatar-s-8.jpg'
import Profile5 from '../../../assets/images/portrait/small/avatar-s-9.jpg'
import Profile6 from '../../../assets/images/portrait/small/avatar-s-15.jpg'
import Profile7 from '../../../assets/images/portrait/small/avatar-s-2.jpg'
import Profile8 from '../../../assets/images/portrait/small/avatar-s-13.jpg'

// const status = {
//   1: { title: 'In Progress', color: 'info' },
//   2: { title: 'Completed', color: 'success' },
//   3: { title: 'Queued', color: 'primary'}
//   // 2: { title: 'Professional', color: 'light-success' },
//   // 3: { title: 'Rejected', color: 'light-danger' },
//   // 5: { title: 'Applied', color: 'light-info' },
// }

// const networks = {
//   1: {title: 'Facebook', icon: <Icon icon="ri:facebook-fill" width={20} height={20}/>},
//   2: {title: 'Instagram', icon: <Icon icon="mdi:instagram" width={20} height={20}/>},
//   3: {title: 'Twitter', icon: <Icon icon="mdi:twitter" width={20} height={20}/>}
// }

export let data

export const CollectionMockData = [
    {
      groupId :  '01',
      groupData : [
        {
        responsive_id: '',
        id: 1,
        profileAvatar: Profile1,
        jobId : '9574946',
        targetName : 'Nathan Reinbott',
        network : 1,
        created : '12/01/2001',
        collected : '13/02/2003',
        status : 1,
        city : 'Melbourne',
        experience : '10 years',
        post : 'senior',
        view : <Icon icon='material-symbols:view-list-outline' width={20} height={20}/>,
        export : <Icon icon='material-symbols:download' width={20} height={20} />,
        chart : <Icon icon="mdi:chart-line" width={20} height={20} />,
        studied_at : '',
        lives_in : '',
        studied : '',
        went_to : '',
        joined : '',
        followed_by : '',
        full_data : ''
      },
      {
        responsive_id: '',
        id: 2,
        profileAvatar: Profile2,
        jobId : '34253245',
        targetName : 'Mike Marinos',
        network : 2,
        created : '10/01/2002',
        collected : '11/02/2003',
        city : 'Sydney',
        experience : '9 years',
        post : 'senior',
        status : 2,
        view : <Icon icon='material-symbols:view-list-outline' width={20} height={20}/>,
        export : <Icon icon='material-symbols:download' width={20} height={20} />,
        chart : <Icon icon="mdi:chart-line" width={20} height={20} />,
        studied_at : '',
        lives_in : '',
        studied : '',
        went_to : '',
        joined : '',
        followed_by : '',
        full_data : ''
    },
      {
        responsive_id: '',
        id: 3,
        profileAvatar: Profile3,
        jobId : '35621879',
        targetName : 'Chiranjit Majumdar',
        network : 3,
        created : '12/01/2003',
        collected : '13/02/2004',
        city : 'Melbourne',
        experience : '8 years',
        post : 'senior',
        status : 3,
        view : <Icon icon='material-symbols:view-list-outline' width={20} height={20}/>,
        export : <Icon icon='material-symbols:download' width={20} height={20} />,
        chart : <Icon icon="mdi:chart-line" width={20} height={20} />,
        studied_at : '',
        lives_in : '',
        studied : '',
        went_to : '',
        joined : '',
        followed_by : '',
        full_data : ''
    }
    ]
    },
    {
      groupId :  '02',
      groupData : [
        {
          responsive_id: '',
          id: 4,
          profileAvatar: Profile4,
          jobId : '980701256',
          targetName : 'Dilip Patidar',
          network : 1,
          created : '12/01/2004',
          collected : '13/02/2005',
          city : 'Canberra',
          experience : '7 years',
          post : 'senior',
          status : 1,
          view : <Icon icon='material-symbols:view-list-outline' width={20} height={20}/>,
          export : <Icon icon='material-symbols:download' width={20} height={20} />,
          chart : <Icon icon="mdi:chart-line" width={20} height={20} />,
          studied_at : '',
          lives_in : '',
          studied : '',
          went_to : '',
          joined : '',
          followed_by : '',
          full_data : ''
      },
      {
        responsive_id: '',
        id: 5,
        profileAvatar: Profile5,
        jobId : '986601256',
        targetName : 'Amit Patel',
        network : 2,
        created : '12/01/2005',
        collected : '13/02/2006',
        city : 'Brisbane',
        experience : '6 years',
        post : 'senior',
        status : 2,
        view : <Icon icon='material-symbols:view-list-outline' width={20} height={20}/>,
        export : <Icon icon='material-symbols:download' width={20} height={20} />,
        chart : <Icon icon="mdi:chart-line" width={20} height={20} />,
        studied_at : '',
        lives_in : '',
        studied : '',
        went_to : '',
        joined : '',
        followed_by : '',
        full_data : ''
    }
    ]
  },
  {
    groupId :  '03',
    groupData : [
      {
        responsive_id: '',
        id: 6,
        profileAvatar: Profile6,
        jobId : '99601256',
        targetName : 'Awais Zubari',
        network : 3,
        created : '12/01/2006',
        collected : '13/02/2007',
        city : 'Perth',
        experience : '5 years',
        post : 'senior',
        status : 3,
        view : <Icon icon='material-symbols:view-list-outline' width={20} height={20}/>,
        export : <Icon icon='material-symbols:download' width={20} height={20} />,
        chart : <Icon icon="mdi:chart-line" width={20} height={20} />,
        studied_at : '',
        lives_in : '',
        studied : '',
        went_to : '',
        joined : '',
        followed_by : '',
        full_data : ''
      },
      {
        responsive_id: '',
        id: 7,
        profileAvatar: Profile7,
        jobId : '98601256',
        targetName : 'Angie Sorohan',
        network : 1,
        created : '12/01/2007',
        collected : '13/02/2008',
        city : 'Darwin',
        experience : '4 years',
        post : 'senior',
        status : 1,
        view : <Icon icon='material-symbols:view-list-outline' width={20} height={20}/>,
        export : <Icon icon='material-symbols:download' width={20} height={20} />,
        chart : <Icon icon="mdi:chart-line" width={20} height={20} />,
        studied_at : '',
        lives_in : '',
        studied : '',
        went_to : '',
        joined : '',
        followed_by : '',
        full_data : ''
      }
  ]
},
{
  groupId :  '04',
  groupData : [
    {
      responsive_id: '',
      id: 8,
      profileAvatar: Profile8,
      jobId : '908601256',
      targetName : 'Finn MacCarthy',
      network : 2,
      created : '12/01/2008',
      collected : '13/02/2009',
      city : 'Hobart',
      experience : '3 years',
      post : 'senior',
      status : 2,
      view : <Icon icon='material-symbols:view-list-outline' width={20} height={20}/>,
      export : <Icon icon='material-symbols:download' width={20} height={20} />,
      chart : <Icon icon="mdi:chart-line" width={20} height={20} />,
      studied_at : '',
      lives_in : '',
      studied : '',
      went_to : '',
      joined : '',
      followed_by : '',
      full_data : ''
    }
]
},
]


const mainRow = [ 
    {
    groupId : '01',
    collectionStatus : 'Collection Started',
    status : 'Active',
    blank : '',
    view : <Link to='/chart' className='font-medium-3'><Icon icon='material-symbols:view-list-outline' width={20} height={20}/></Link>,
    export : <Link to='/chart' className='font-medium-3'><Icon icon='material-symbols:download' width={20} height={20} /></Link>,
    chart : <Link to='/chart' className='font-medium-3'><Icon icon="mdi:chart-line" width={20} height={20} /></Link>
    },
  {
    groupId : '02',
    collectionStatus : 'Collection Started',
    status : 'Active',
    blank : '',
    view : <Link to='/chart' className='font-medium-3'><Icon icon='material-symbols:view-list-outline' width={20} height={20}/></Link>,
    export : <Link to='/chart' className='font-medium-3'><Icon icon='material-symbols:download' width={20} height={20} /></Link>,
    chart : <Link to='/chart' className='font-medium-3'><Icon icon="mdi:chart-line" width={20} height={20} /></Link>
  },
  {
    groupId : '03',
    collectionStatus : 'Collection Started',
    status : 'Active',
    blank : '',
    view : <Link to='/chart' className='font-medium-3'><Icon icon='material-symbols:view-list-outline' width={20} height={20}/></Link>,
    export : <Link to='/chart' className='font-medium-3'><Icon icon='material-symbols:download' width={20} height={20} /></Link>,
    chart : <Link to='/chart' className='font-medium-3'><Icon icon="mdi:chart-line" width={20} height={20} /></Link>
  },
  {
    groupId : '04',
    collectionStatus : 'Collection Started',
    status : 'Active',
    blank : '',
    view : <Link to='/chart' className='font-medium-3'><Icon icon='material-symbols:view-list-outline' width={20} height={20}/></Link>,
    export : <Link to='/chart' className='font-medium-3'><Icon icon='material-symbols:download' width={20} height={20} /></Link>,
    chart : <Link to='/chart' className='font-medium-3'><Icon icon="mdi:chart-line" width={20} height={20} /></Link>
  }
 ]

data = mainRow


export const columns = [
  {
    name: 'Job ID',
    minWidth: '50px',
    sortable: row => row.groupId,
    selector: row => row.groupId
  },
  {
    name: 'Collection Status',
    minWidth: '140px',
    selector: row => row.collectionStatus
    // selector: row => (
    //   <div className='d-flex align-items-center'>
    //   <img style={{borderRadius: '50%'}} src={row.profileAvatar} width={40} height={40}/> 
    //   </div>
    // )
  },
  {
    name: 'Status',
    minWidth: '130px',
    selector: row => row.status
    // selector: row => row.targetName
  },
  {
    name : '',
    minWidth: '200px',
    selector: row => row.blank
  },
  // {
  //   name: '',
  //   sortable: true,
  //   minWidth: '90px',
  //   selector: row => row.network,
  //   cell: row => {
  //     return (networks[row.network].icon)
  //   }
  // },
  // {
  //   name: '',
  //   sortable: true,
  //   minWidth: '120px',
  //   selector: row =>row.created
  // },
  // {
  //   name: '',
  //   sortable: true,
  //   minWidth: '120px',
  //   selector: row => row.collected
  // },
  // {
  //   name: '',
  //   minWidth: '100px',
  //   sortable: row => row.status.title,
  //   cell: row => {
  //     return (
  //       <Badge color={status[row.status].color} pill>
  //         {status[row.status].title}
  //       </Badge>
  //     )
  //   }
  // },
  {
      name: 'View',
      minWidth: '30px',
      selector: row => row.view
  },
  {
      name: 'Export',
      minWidth: '30px',
      selector: row => row.export
  },
  {
      name: 'Chart',
      minWidth: '30px',
      selector: row => row.chart
  },
]

// ** Table Common Column
// export const groupcolumns = [
//     {
//       name: 'Target ID',
//       minWidth: '80px',
//       sortable: row => row.jobId,
//       selector: row => row.jobId
//     },
//     {
//       name: 'Profile',
//       minWidth: '50px',
//       selector: row => (
//         <div className='d-flex align-items-center'>
//         <img style={{borderRadius: '50%'}} src={row.profileAvatar} width={40} height={40}/> 
//         </div>
//       )
//     },
//     {
//       name: 'Target Name',
//       sortable: true,
//       minWidth: '100px',
//       selector: row => row.targetName
//     },
//     {
//       name: 'Network',
//       sortable: true,
//       minWidth: '50px',
//       selector: row => row.network,
//       cell: row => {
//         return (networks[row.network].icon)
//       }
//     },
//     {
//       name: 'Created Date',
//       sortable: true,
//       minWidth: '100px',
//       selector: row =>row.created
//     },
//     {
//       name: 'Collected Date',
//       sortable: true,
//       minWidth: '100px',
//       selector: row => row.collected
//     },
//     {
//       name: 'Status',
//       minWidth: '50px',
//       sortable: row => row.status.title,
//       cell: row => {
//         return (
//           <Badge color={status[row.status].color} pill>
//             {status[row.status].title}
//           </Badge>
//         )
//       }
//     },
//     {
//         name: 'View',
//         minWidth: '30px',
//         selector: row => row.view,
//         cell: (row) => {
//           return (
//             <Link to='/view' className='font-medium-3'>{row.view}</Link>
//           )
//         }
//     },
//     {
//         name: 'Export',
//         minWidth: '30px',
//         selector: row => row.export,
//         cell: (row) => {
//           return (
//             <Link to='/export' className='font-medium-3'>{row.export}</Link>
//           )
//         }
//     },
//     {
//         name: 'Chart',
//         minWidth: '30px',
//         selector: row => row.chart,
//         cell: (row) => {
//           return (
//             <Link to='/chart' className='font-medium-3'>{row.chart}</Link>
//           )
//         }
//     },
//   ]

import React from 'react'
import { Table } from 'reactstrap'
import { Link } from 'react-router-dom'

export default function Tooltip({ position, data }) {
  return (
    <div className="tt" >
      <div className="tt-content">
        <Table responsive>
          <tbody>
            <tr>
              <td colSpan={2} className='text-center'><strong>{data.data.categories[0]}</strong></td>
            </tr>
            {Object.keys(data.data.properties).map((item, i) => {
              return (
                <tr key={i}>
                  <td>
                    <strong>{item.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function (item) { return item.toUpperCase() })} : </strong>
                  </td>
                  {item.toLowerCase().includes("url") ? (
                    <td><a href={data.data.properties[item]} target="_blank" >View</a></td>
                  ) : (
                    <td>{data.data.properties[item]}</td>
                  )
                  }
                </tr>
              )
            })}
            <tr>
                  <td>Post image</td>
                  <td><img src='https://picsum.photos/200/300' width="50" height="75" /></td>
                </tr>
          </tbody>
        </Table>
      </div>
    </div>
  )
}

import React from 'react'
import {Link} from 'react-router-dom'
import { ActionDelete } from 'material-ui/svg-icons'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentCreate from 'material-ui/svg-icons/content/create'
import ContentAdd from 'material-ui/svg-icons/content/add'
import {pink500, grey200, grey500} from 'material-ui/styles/colors'
import { PageBase } from '../../components'

const UsersTable = ({ data, onTouchTap, onEdit }) => {
  const styles = {
    floatingActionButton: {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    },
    editButton: {
      fill: grey500
    },
    columns: {
      id: {
        width: '10%'
      },
      name: {
        width: '20%'
      },
      email: {
        width: '30%'
      },
      role: {
        width: '20%'
      },
      edit: {
        width: '20%'
      }
    }
  }

  return (
    <PageBase title="Users"
              navigation="Home / Users">

      <div>
        <Link to="/users/create" >
          <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.price}>Email</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.role}>Role</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(item =>
              <TableRow key={item.id}>
                <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>
                <TableRowColumn style={styles.columns.name}>{item.name}</TableRowColumn>
                <TableRowColumn style={styles.columns.price}>{item.email}</TableRowColumn>
                <TableRowColumn style={styles.columns.role}>{item.role_name}</TableRowColumn>
                <TableRowColumn style={styles.columns.edit}>
                  <FloatingActionButton zDepth={0}
                                        mini={true}
                                        backgroundColor={grey200}
                                        onTouchTap={() => onEdit(item)}
                                        iconStyle={styles.editButton}>
                    <ContentCreate  />
                  </FloatingActionButton>
                  <FloatingActionButton zDepth={0}
                                        mini={true}
                                        backgroundColor={grey200}
                                        iconStyle={styles.editButton}>
                    <ActionDelete  />
                  </FloatingActionButton>
                </TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>    
      </div>
    </PageBase>
  )
}

export default UsersTable

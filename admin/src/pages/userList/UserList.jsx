import './userlist.css'
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import {Link} from 'react-router-dom'
import {UserContext} from '../../context/userContext/UserContext'
import {useContext, useEffect} from 'react'
import { getUsers, deleteUser } from '../../context/userContext/apiCalls';

const UserList = () => {
  
  const {users, dispatch} = useContext(UserContext)
  console.log(users)

  useEffect(() => {
    getUsers(dispatch)
  }, [dispatch])

  const handleDelete = (id) => {
    deleteUser(id, dispatch)
  }

  const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    { field: 'user', headerName: 'User', width: 250, renderCell: (params) => {
      return (
        <div className="userListUser">
          <img className='userListImg' alt='list-img' src={params.row.profilePic} />
          {params.row.username}
        </div>
      )
    } },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'isAdmin',
      headerName: 'IsAdmin',
      width: 150,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link 
              to={`/user/${params.row._id}`}
              state={params.row}
            >
              <button className='userListEdit'>Edit</button>
            </Link>
            <DeleteOutline className='userListDelete' onClick = {() => handleDelete(params.row._id)}/>
          </>
        )
      }
    }
  ];
  

  return (
    <div className='userList'>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(r) => r._id}
      />
    </div>
  )
};

export default UserList;

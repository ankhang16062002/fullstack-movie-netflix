import './productlist.css'
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import {Link} from 'react-router-dom'
import {useContext, useEffect} from 'react'
import { MovieContext } from '../../context/movieContext/MovieContext';
import { deleteMovie, getMovies } from '../../context/movieContext/apiCalls';

const ProductList = () => {
    const {movies, dispatch} = useContext(MovieContext)

    useEffect(() => {
      getMovies(dispatch)
    }, [dispatch])

    const handleDelete = (id) => {
      deleteMovie(id, dispatch)
    }
    
    const columns = [
      { field: '_id', headerName: 'ID', width: 220 },
      { field: 'movie', headerName: 'Movie', width: 300, renderCell: (params) => {
        return (
          <div className="productListUser">
            <img className='productListImg' alt='list-img' src={params.row.img} />
            {params.row.title}
          </div>
        )
      } },
      { field: 'genre', headerName: 'Genre', width: 130 },
      { field: 'year', headerName: 'Year', width: 110 },
      { field: 'limit', headerName: 'Limit', width: 110 },
      { field: 'isSeries', headerName: 'IsSeries', width: 110 },
      {
        field: 'action',
        headerName: 'Action',
        width: 150,
        renderCell: (params) => {
          return (
            <>
              <Link 
                to={`/product/${params.row._id}`}
                state = {params.row}
              >
                <button className='productListEdit'>Edit</button>
              </Link>
              <DeleteOutline className='productListDelete' onClick = {() => handleDelete(params.row._id)}/>
            </>
          )
        }
      }
    ];

  return (
    <div className='productList'>
      <DataGrid
        rows={movies}
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

export default ProductList;

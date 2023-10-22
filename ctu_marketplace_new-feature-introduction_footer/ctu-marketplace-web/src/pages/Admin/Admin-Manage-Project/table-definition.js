
const actionFormatter = ({ value }) => { 
  return (
    <div className="d-flex">{ value }</div>
  )
};

export const columns = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 90,
    editable: true,
    type: 'text', 
  },
  {
    field: 'name',
    headerName: 'Tên',
    width: 450,
    editable: true,
    type: 'text',
  },
  {
    field: 'status',
    headerName: 'Trạng thái',
    width: 450,
    editable: true,
    type: 'combobox',
  },
  {
    field: 'action',
    headerName: 'Hành động',
    width: 150,
    editable: false,
    type: '',
    renderCell: actionFormatter,
  },

];

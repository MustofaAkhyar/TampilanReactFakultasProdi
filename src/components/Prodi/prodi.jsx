import React, { useEffect, useState } from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"
import Swal from "sweetalert2"

export default function List() {
    const handleDelete = (id, nama) => {
        Swal.fire({
            title: 'Apakah anda yakin?',
            text: `Anda akan menghapus prodi ${nama}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed){
                axios.delete(`https://laravelif3b-mustofa.vercel.app/api/api/prodi/${id}`)
                .then((response) => {

                    setProdi(prodi.filter((data) => data.id !== id))
                    Swal.fire(
                        'Berhasil!',
                        'Prodi berhasil dihapus',
                        'success'
                    )
            }).catch((error) => {
                console.log('Error : ', error)
                Swal.fire(
                    'Gagal!',
                    'prodi gagal dihapus',
                    'error'
                );
            });
        }
        })
    }

    const [prodi, setProdi] = useState([])
    useEffect(() => {
        axios.get("https://laravelif3b-mustofa.vercel.app/api/api/prodi")
            .then((response) => {
                console.log(response.data.result)
                setProdi(response.data.result)
            })
            .catch(error => {
                console.log('Error : ', error)
            })
    }, [])


    return (
        <div>

           
            <h2>List Prodi</h2>
            <NavLink to="/prodi/create" className="btn btn-primary my-4">Create</NavLink>
            <ul className="list-group">
                {
                    <table className="table table-success table-striped-columns">
                        <thead>
                            <tr>
                                <th scope="col">Nama</th>
                                <th scope="col">Fakultas</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                prodi.map((data) => (
                                        <tr key={data.id}>
                                            <td>{data.nama}</td>
                                            <td>{data.fakultas.nama}</td>
                                            
                                            <td>
                                            <div className="btn-group" role="group" aria-label="Action buttons">
                                                <NavLink to={`/prodi/edit/${data.id}`} className="btn btn-warning">
                                                Edit </NavLink>
                                                <button onClick={() => handleDelete(data.id, data.nama)} className="btn btn-danger">Delete</button>
                                                </div>
                                            </td>
                                            
                                        </tr>
                                ))}
                        </tbody>
                    </table>
                }
            </ul>
        </div>
    )
}

import React, { useEffect, useState } from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"
import Swal from "sweetalert2"

export default function List() {
    const handleDelete = (id, nama) => {
        Swal.fire({
            title: 'Apakah anda yakin?',
            text: `Anda akan menghapus fakultas ${nama}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed){
                axios.delete(`https://laravelif3b-mustofa.vercel.app/api/api/fakultas/${id}`)
                .then((response) => {

                    setFakultas(fakultas.filter((data) => data.id !== id))
                    Swal.fire(
                        'Berhasil!',
                        'Fakultas berhasil dihapus',
                        'success'
                    )
            }).catch((error) => {
                console.log('Error : ', error)
                Swal.fire(
                    'Gagal!',
                    'Fakultas gagal dihapus',
                    'error'
                );
            });
        }
        })
    }

    const [fakultas, setFakultas] = useState([])
    useEffect(() => {
        axios.get("https://laravelif3b-mustofa.vercel.app/api/api/fakultas")
            .then((response) => {
                console.log(response.data.result)
                setFakultas(response.data.result)
            })
            .catch(error => {
                console.log('Error : ', error)
            })
    },
        [])

    return (
        <>
            <h2>List Fakultas</h2>

            {/* Button tambah fakultas */}
            <NavLink to="/fakultas/create" className="btn btn-primary my-4">Create</NavLink>

            <ul className="list-group">
                {fakultas.map((data) => (
                    <li key={data.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span> {data.nama} </span>
                        <div className="btn-group" role="group" aria-label="Action buttons">
                            <NavLink to={`/fakultas/edit/${data.id}`} className="btn btn-warning">Edit</NavLink>
                            <button onClick={() => handleDelete(data.id, data.nama)} className="btn btn-danger">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

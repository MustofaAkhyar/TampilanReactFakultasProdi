import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CreateProdi() {
    const [namaProdi, setNamaProdi] = useState("");
    const [fakultasId, setFakultasId] = useState("");
    const [fakultasList, setFakultasList] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchFakultas = async () => {
            try{
                const response = await axios.get(
                    "https://laravelif3b-mustofa.vercel.app/api/api/fakultas"
                );
                setFakultasList(response.data.result);
            }catch(error){
                setError("Failed to")
            }
        };
        fetchFakultas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (namaProdi.trim() === "" || fakultasId.trim() === "") {
            setError("Nama Prodi and Fakultas is Rquired");
            return;
        }

        try {
            const response = await axios.post(
                "https://laravelif3b-mustofa.vercel.app/api/api/prodi",
                {
                    nama: namaProdi,
                    fakultas_id: fakultasId,
                }
            );
            if (response.status === 201) {
                setSuccess("Prodi created successfully");
                setNamaProdi("");
            } else {
                setError("Failed to create Prodi");
            }
        } catch (error) {
            setError("An error occurred while creating Fakultas");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create Fakultas</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="namaProdi" className="form-label">Nama Prodi</label>

                    <input type="text" className="form-control" id="namaProdi"
                        value={namaProdi} onChange={(e) => setNamaProdi(e.target.value)}
                        placeholder="Masukkan Nama Prodi"
                    />
                </div>
                <div className="mb-3">
                    <option value="">Select Fakultas</option>
                    <select className="form-select" id="fakultasId" value={fakultasId}
                        onChange={(e) => setFakultasId(e.target.value)}>
                        {fakultasList.map((data) => (
                            <option key={data.id} value={data.id}>{data.nama}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Tambah</button>
            </form>
        </div>


    );
}
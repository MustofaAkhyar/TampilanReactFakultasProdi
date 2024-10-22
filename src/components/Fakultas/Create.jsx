import React, { useState } from "react";
import axios from "axios";

export default function CreateFakultas() {
    const [namaFakultas, setNamaFakultas] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (namaFakultas.trim() === "") {
            setError("Nama Fakultas is required");
            return;
        }

        try {
            const response = await axios.post(
                "https://laravelif3b-mustofa.vercel.app/api/api/fakultas",
                { nama : namaFakultas }
            );
            if (response.status === 201) {
                setSuccess("Fakultas created successfully");
                setNamaFakultas("");
            } else {
                setError("Failed to create Fakultas");
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
                        <label htmlFor="namaFakultas" className="form-label">Nama Fakultas</label>

                        <input type="text" className="form-control" id="namaFakultas"
                            value={namaFakultas} onChange={(e) => setNamaFakultas(e.target.value)}
                            placeholder="Masukkan Nama Fakultas"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Create</button>
                </form>
            </div>


        );
    }
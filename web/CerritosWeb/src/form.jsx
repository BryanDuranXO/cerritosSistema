import React, { useState } from 'react';
import { Navegacion } from './components/nav';

function Form() {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        fecha: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/pdf/save', {
                nombre: formData.nombre,
                correo: formData.correo,
                telefono: formData.telefono,
                fecha: formData.fecha
            }, {
                responseType: 'blob' // Indica que esperas una respuesta de tipo blob (archivo)
            });

            // Crear una URL de objeto desde el blob
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Crear un enlace y simular un clic para descargar el archivo
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'persona.pdf');
            document.body.appendChild(link);
            link.click();

            // Limpiar la URL del objeto una vez que se ha descargado el archivo
            window.URL.revokeObjectURL(url);

            setFormData({
                nombre: '',
                correo: '',
                telefono: '',
                fecha: ''
            });
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };

    return (

        <>

<Navegacion/>

            <div style={{ width: '80%', height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderWidth: '2px' }}>

                <form style={{ border: '1px solid black', padding: '20px', width: '50%', maxWidth: '500px' }} onSubmit={handleSubmit}>
                    <label>
                        Nombre:
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Correo:
                        <input type="email" name="correo" value={formData.correo} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Teléfono:
                        <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Fecha:
                        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
                    </label>
                    <br />
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </>
    );
}

export default Form;

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';

const App = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [curso, setCurso] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoAEditarIndex, setAlumnoAEditarIndex] = useState(null);

  const agregarOEditarAlumno = () => {
    if (alumnoAEditarIndex !== null) {
      const nuevosAlumnos = [...alumnos];
      nuevosAlumnos[alumnoAEditarIndex] = { nombre, apellido, edad, curso };
      setAlumnos(nuevosAlumnos);
      setAlumnoAEditarIndex(null);
    } else {
      setAlumnos([...alumnos, { nombre, apellido, edad, curso }]);
    }
    setNombre('');
    setApellido('');
    setEdad('');
    setCurso('');
  };

  const iniciarEdicion = (index) => {
    setAlumnoAEditarIndex(index);
    const alumno = alumnos[index];
    setNombre(alumno.nombre);
    setApellido(alumno.apellido);
    setEdad(alumno.edad);
    setCurso(alumno.curso);
  };

  const borrarAlumno = (index) => {
    const nuevosAlumnos = [...alumnos];
    nuevosAlumnos.splice(index, 1);
    setAlumnos(nuevosAlumnos);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
        style={styles.input}
      />
      <TextInput
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Curso"
        value={curso}
        onChangeText={setCurso}
        style={styles.input}
      />
      <TouchableOpacity
        style={alumnoAEditarIndex !== null ? styles.botonGuardar : styles.botonAgregar}
        onPress={agregarOEditarAlumno}
      >
        <Text style={styles.textoBoton}>{alumnoAEditarIndex !== null ? 'Guardar Edición' : 'Agregar'}</Text>
      </TouchableOpacity>

      <FlatList
        data={alumnos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.alumnoItem}>
            <Text>{`${item.nombre} ${item.apellido}`}</Text>
            <TouchableOpacity style={styles.botonEditar} onPress={() => iniciarEdicion(index)}>
              <Text style={styles.textoBoton}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonBorrar} onPress={() => borrarAlumno(index)}>
              <Text style={styles.textoBoton}>Borrar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 16,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    width: 200, 
  },
  botonAgregar: {
    backgroundColor: '#4CAF50', 
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  botonGuardar: {
    backgroundColor: '#FFC107', 
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  botonEditar: {
    backgroundColor: '#2196F3',
    padding: 8,
    paddingHorizontal: 20,
  },
  botonBorrar: {
    backgroundColor: '#f44336', 
    padding: 8,
    paddingHorizontal: 20,
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
  },
  alumnoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
});

export default App;

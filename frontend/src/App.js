// React packages
import React from 'react';
import { BrowserRouter as Router, Route , Routes,Table} from 'react-router-dom';
// Components
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
// Screens
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserEditScreen from './screens/UserEditScreen';
import FileEditorScreen from './screens/FileEditorScreen';
import FileEditorScreenH from './screens/FileEditorScreenH';
import MenuScreen from './screens/MenuScreen';
import FileScreenH from './screens/FileScreenH';
import FileScreen from './screens/FileScreen';

import FileViewScreen from './screens/FileViewScreen';
import FileViewH from './screens/FileViewH';
import FileView from './screens/FileView';





function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
          <Route path='/register' element={<RegisterScreen/>}></Route>
          <Route path='/login' element={<LoginScreen/>}></Route>
          <Route path='/view' element={<FileViewScreen/>}></Route>
          <Route path='/viewh' element={<FileViewH/>}></Route>
          <Route path='/viewe' element={<FileView/>}></Route>
          <Route path='/profile' element={<ProfileScreen/>}></Route>
          <Route path='/menu' element={<MenuScreen/>}></Route>
          <Route path='/file' element={<FileEditorScreen/>}></Route>
          <Route path='/fileh' element={<FileEditorScreenH/>}></Route>
          <Route path='/file_makerh' element={<FileScreenH/>}></Route>
          <Route path='/file_makere' element={<FileScreen/>}></Route>
          <Route path='/admin/user/:id/edit' element={<UserEditScreen/>}></Route>
          <Route path='/' element={<HomeScreen/>} exact ></Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

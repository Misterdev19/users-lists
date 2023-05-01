import { useState , useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './App.css';



const  ModalView = ({show , handleClose}) => {
 

  return (
    <>
    
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const  ItemUser  = ( { id,  name  , nameUser , phone , webSite , company , email , handleShow  }) => {
    
  const WEB_SITE =  <a href={webSite} >{webSite}</a>;
  
  return (
    <tr>
    <td>{id}</td>
    <td>{name}</td>
    <td>{nameUser}</td>
    <td>{phone}</td>
    <td>{WEB_SITE}</td>
    <td>{company}</td>
    <td><Button variant="info" style={{"color":"white"} }  onClick={handleShow}>View adress</Button></td>
    <td>{email}</td>
  </tr>
  
  );
}




const  TableView = ({listUsers , handleShow}) => {
  
   
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>User Name </th>
          <th>Phone</th>
          <th>WebSite</th>
          <th>Company</th>
          <th>address</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>

       {
          listUsers.map((user) => {

            return (
              <ItemUser 
               id={user.id} 
               name={user.name} 
               nameUser={user.username} 
               phone={user.phone}  
               webSite={user.website}
               company={user.company.name} 
               key={user.id}  
               email={user.email} 
               handleShow={handleShow}
               /> 
               
              ) 
          })
       }
  
      </tbody>
    </Table>
  );
}

function App() {


      /*estado de list usuarios API  */
      const [ listUsers, setListUsers ] = useState([])
      const [show, setShow] = useState(false);

      
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

   
      
       useEffect(()=>{
             
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => setListUsers(data))
        
       } , []);

   
    
  return (
    <>
      <Container>
             <Row>
                  <Col>
                       <TableView  listUsers={listUsers} handleShow={handleShow}/>
                   </Col>
              </Row>
              <ModalView show={show} handleClose={handleClose} ></ModalView>
       </Container>
    </>
  )
}

export default App

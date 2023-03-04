// React packages
import React from 'react'
// Components
import { Container,Row,Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    Copyright &copy; NotriWeb 2023
                </Col>
            </Row>
        </Container>
        </footer>
    )
}

export default Footer

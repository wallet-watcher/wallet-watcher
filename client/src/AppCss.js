import styled from 'styled-components';

export const Wrapper = styled.div`
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Intro = styled.div`
  font-size: 0.9rem;
  color: white;
  width: 600px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  label {
    margin-right: 1rem;
  }
`;

export const Button = styled.button`
  padding: 0.2rem 1rem;
  font-size: 1.1rem;
  background-color: #47c8c7;
  color: #fff;
  border-radius: 10px;
  border-color: #d60d90;
  width: 200px;
  height: 40px;

  :hover {
    background-color: #d60d90;
    cursor: pointer;
  }
`;
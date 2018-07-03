import styled from 'styled-components';

export const Wrapper = styled.div`
  font-family: sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Intro = styled.div`
  font-size: 0.9rem;
  color: #666;
  width: 500px;
`;

export const Chart = styled.iframe`
  width: 500px;
  height: 125px;
  background: #eee;
`;

export const Form = styled.form`
  margin: 1rem auto;
`;

export const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 500px;
  label {
    margin-right: 1rem;
  }

  input {
    width: 210px;
    margin-bottom: 1rem;
    height: 30px;
    font-size: 1.1rem;
    border-radius: 5px;
    border: 0.5px solid #ccc;
    padding: 0.2rem 1rem;
    box-shadow: 0px 0px 0px 1px #fff inset;
  }

  .HasError {
    border: 1px solid red;
  }
`;

export const Button = styled.button`
  padding: 0.2rem 1rem;
  font-size: 1.1rem;
  background-color: #ee6352;
  color: #fff;
  border-radius: 10px;
  width: 200px;
  height: 40px;

  :hover {
    background-color: #c62a17;
    cursor: pointer;
  }
`;

export const Err = styled.div`
  display: ${props => (props.errors === true ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  color: red;
  font-weight: 500;
  width: 250px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid red;
`;

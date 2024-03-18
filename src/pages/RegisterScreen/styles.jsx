import styled from 'styled-components';
import { Select, Input, Button, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

export const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 9rem 5rem 3rem 5rem;

  @media screen and (max-width: 768px) {
    margin: 6rem 1rem 2rem 1rem;
  }
`;

export const FormContainer = styled.div`
  background: var(--cor-de-fundo);
  padding: 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  max-width: 25rem;
  min-width: 18.75rem;
  margin-right: 8rem;

  @media screen and (max-width: 768px) {
    margin-right: 0rem;
  }
`;

export const StyledSelect = styled(Select)`
  .ant-select-selector {
    min-height: auto !important;
    max-height: auto !important;
  }
`;

export const StyledInput = styled(Input)`
  &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    height: auto !important;
  }

  &.ant-form-item-control-input input,
  &.ant-form-item-control-input .ant-select-selector {
    border-radius: 0.25rem;
    border: 0.0625rem solid #d9d9d9;
  }

  &.ant-input-password .ant-input {
    border-radius: 0.25rem;
    border: 0.0625rem solid #d9d9d9;
  }
`;

export const StyledButton = styled(Button)`
  width: 100%;
  border-radius: 0.25rem;
  background-color: var(--azul);
  border-color: #1890ff;
  height: 2.5rem;
  font-weight: 500;

  &:hover {
    background-color: darken(#1890ff, 5%);
    border-color: darken(#1890ff, 5%);
  }

  &.button-disabled {
    color: white !important;
    opacity: 0.65; 
  }

  &.button-disabled.ant-btn-primary:disabled {
    color: white !important;
  }
`;

export const StyledLink = styled(Link)`
  color: var(--azul);
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: darken(#1890ff, 10%);
  }
`;

export const StyledTooltip = styled(Tooltip)`
  .ant-tooltip-inner {
    background-color: var(--cor-de-fundo);
    color: var(--cinza-texto);
    border: 1px solid var(--cinza-texto);
  }
`;

export const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  & > div {
    font-size: 50px;
    color: green;
  }
`;

export const MarketingContainer = styled.div`
  max-width: 31.25rem;

  & img {
    width: 9.375rem;
    margin-bottom: 1.25rem;
  }

  & h1 {
    font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 2.25rem;
    color: var(--azul);
  }

  & p {
    font-size: 1rem;
    margin-bottom: 1.875rem;
    line-height: 1.5rem;
    color: var(--cinza-texto);
    text-align: left;
  }

  & ul {
    list-style-type: none;
    margin-left: 1.25rem;
    margin-bottom: 1.875rem;
  }

  & ul li {
    font-size: 1rem;
    color: var(--cinza-texto);
    margin-bottom: 0.5rem;
  }

  & ul li svg {
    margin-right: 1.5625rem;
    color: var(--azul);
  }

  & img:first-child {
    width: 12rem;
  }

  & .marketing-img {
    width: 20rem !important;
    display: block;
    margin: 0 auto;
  }
`;

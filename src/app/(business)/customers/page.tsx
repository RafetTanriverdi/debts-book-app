import CreateCustomerModal from '@rt/app/(business)/customers/(page-components)/CreateCustomer/CreateCustomerModal';
import CustomerList from '@rt/app/(business)/customers/(page-components)/CustomerList/CustomerList';
import React from 'react';

function Customers() {
  return (
    <>
      <CreateCustomerModal />
      <CustomerList />
    </>
  );
}

export default Customers;

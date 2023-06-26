import React, { useState } from 'react';

export default function App() {
  return (
    <div>text 2</div>
  )
}

export async function getServerSideProps({ req }) {
  const headers = req ? req.headers : {};
  return { props: { headers } }
}
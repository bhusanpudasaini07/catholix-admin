import MainLayout from '@/shared/main-layout';
import React from 'react'

const Bundles = () => {
  return (
    <div>Bundles</div>
  )
}

export default Bundles

Bundles.getLayout = (page: any) => {
  return <MainLayout>{page}</MainLayout>;
};
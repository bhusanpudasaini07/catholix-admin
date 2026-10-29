import MainLayout from '@/shared/main-layout';
import React from 'react'

const Banner = () => {
  return (
    <div>Banner</div>
  )
}

export default Banner

Banner.getLayout = (page: any) => {
  return <MainLayout>{page}</MainLayout>;
};
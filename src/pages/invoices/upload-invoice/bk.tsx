import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead, 
    TableHeader,
    TableRow,
  } from "@/shared/components/ui/table";
import Image from "next/image";
import { Logo } from "@/shared/lib/image-config";
import { Button } from "@/shared/components/ui/button";
import { Plus, PlusCircle } from "lucide-react";

const dummyData = [
    {
      id: "1",
      title1: "Title 1 Text",
      title2: "Title 2 Text",
      title3: "Title 3 Text",
      title4: "Title 4 Text",
    },
    {
      id: "2",
      title1: "Title 1 Text",
      title2: "Title 2 Text",
      title3: "Title 3 Text",
      title4: "Title 4 Text",
    },
    {
      id: "3",
      title1: "Title 1 Text",
      title2: "Title 2 Text",
      title3: "Title 3 Text",
      title4: "Title 4 Text",
    },
    {
      id: "4",
      title1: "Title 1 Text",
      title2: "Title 2 Text",
      title3: "Title 3 Text",
      title4: "Title 4 Text",
    },
  ];
const bk = () => {
  return (
    <div className="blur-sm relative">
    <div className="bg-[#fff] opacity-60 z-6 absolute top-0 left-0 right-0 bottom-0"></div>
    <div className="flex items-center justify-between p-6">
      <h5 className="text-4xl text-purple-60 font-bold">Invoice</h5>
      <Image src={Logo} width={100} height={100} alt="Invoice Image" />
    </div>
    <div className="p-6">
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-260 uppercase">
          Vendor Details
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h4 className="text-xl text-black font-bold">Name</h4>
            <Button
              variant={"ghost"}
              className="text-primary flex items-center gap-1"
            >
              <PlusCircle />
              Add to vendor list
            </Button>
          </div>
          <h4 className="text-xl font-medium text-black">#643214</h4>
        </div>
      </div>
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-260 uppercase">
              Address
            </p>
            <p className="text-lg text-black/80 font-medium">
              Address line, Street Address, City Name, State
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-gray-260 uppercase">
              Invoice Date
            </p>
            <p className="text-lg text-black/80 font-medium">
              Date , Year
            </p>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-260 uppercase">
              Email
            </p>
            <p className="text-lg text-black/80 font-medium">
              email@mail.com
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-gray-260 uppercase">
              Due Date
            </p>
            <p className="text-lg text-black/80 font-medium">
              Date , Year
            </p>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-260 uppercase">
              Phone No.
            </p>
            <p className="text-lg text-black/80 font-medium">
              + ... .....
            </p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <Table>
        <TableHeader className="bg-purple-60 text-white">
          <TableRow>
            <TableHead className="text-white">SN.</TableHead>
            <TableHead className="text-white">Title 1</TableHead>
            <TableHead className="text-white">Title 2</TableHead>
            <TableHead className="text-white">Title 3</TableHead>
            <TableHead className="text-white">Title 4</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyData.map((data) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{data.id}.</TableCell>
              <TableCell>{data.title1}</TableCell>
              <TableCell>{data.title2}</TableCell>
              <TableCell>{data.title3}</TableCell>
              <TableCell>{data.title4}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="text-center flex items-center justify-center text-primary text-sm px-6 py-5 border-t">
        <Plus /> Add new Item
      </div>
    </div>
  </div>
  )
}

export default bk
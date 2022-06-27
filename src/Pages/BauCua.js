import { Button } from 'antd'
import React, {useState} from 'react'

export default function BauCua() {
    const [tienDatCuoc, setTienDatCuoc] = useState({
        bau: 0,
        cua: 0,
        tom: 0,
        ca:0,
        ga:0,
        ho:0
    })

    const xucxac = ["bau", "cua", "tom", "ca", "ga", "ho"];
    const [ketQua, setKetQua] = useState({
        ss1: 0,
        ss2: 0,
        ss3: 0
    })
    const [yourCash,setYourCash] = useState(10000)

    const tangTienCuoc = (name, soTien) => {
        if (yourCash > 0)
       { setTienDatCuoc({
            ...tienDatCuoc,
            [name]: tienDatCuoc[name] + soTien
        })
        setYourCash(yourCash - soTien)}
    }

    const giamTienCuoc = (name, soTien) => {
        if (tienDatCuoc[name] - soTien >= 0)
       { setTienDatCuoc({
            ...tienDatCuoc,
            [name]: tienDatCuoc[name] - soTien
        })
        setYourCash(yourCash + soTien)}
    }

    const runPlay = () => {
      const ss1 = Math.floor(Math.random()*5)
      const ss2 = Math.floor(Math.random()*5)
      const ss3 = Math.floor(Math.random()*5)
    
      const money = yourCash +  tienDatCuoc[xucxac[ss1]]*2 + tienDatCuoc[xucxac[ss2]]*2 + tienDatCuoc[xucxac[ss3]]*2;
      setYourCash(money)
      setKetQua({
        ss1,ss2,ss3
      })
      console.log(tienDatCuoc[xucxac[ss1]])
      console.log(ss2)
      console.log(ss3)

    }
  return (
    <div className='z-10 relative flex pt-20'>
        <div className='w-96 h-96 mr-10 py-20' style={{
            backgroundImage: "url(https://cf.shopee.vn/file/a11c8df2185316f960bfd1eddd2708c3)",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div className='grid grid-cols-3 text-white bg-black bg-opacity-50'>
                <div className='col-span-1  flex justify-between w-10'>
                    <Button onClick={() => {
                      giamTienCuoc('ho', 1000)
                    }}>-</Button>
                    <p>{tienDatCuoc.ho}</p>
                    <Button onClick={() => {
                      tangTienCuoc('ho', 1000)
                    }}>+</Button>
                </div>
                <div className='col-span-1  flex justify-between w-10'>
                    <Button onClick={() => {
                      giamTienCuoc('bau', 1000)
                    }}>-</Button>
                    <p>{tienDatCuoc.bau}</p>
                    <Button onClick={() => {
                      tangTienCuoc('bau', 1000)
                    }}>+</Button>
                </div>
                <div className='col-span-1  flex justify-between w-10'>
                    <Button onClick={() => {
                      giamTienCuoc('ga', 1000)
                    }}>-</Button>
                    <p>{tienDatCuoc.ga}</p>
                    <Button onClick={() => {
                      tangTienCuoc('ga', 1000)
                    }}>+</Button>
                </div>
                <div className='h-32 col-span-3'></div>
                <div className='col-span-1  flex justify-between w-10'>
                    <Button onClick={() => {
                      giamTienCuoc('tom', 1000)
                    }}>-</Button>
                    <p>{tienDatCuoc.tom}</p>
                    <Button onClick={() => {
                      tangTienCuoc('tom', 1000)
                    }}>+</Button>
                </div>
                <div className='col-span-1  flex justify-between w-10'>
                    <Button onClick={() => {
                      giamTienCuoc('ca', 1000)
                    }}>-</Button>
                    <p>{tienDatCuoc.ca}</p>
                    <Button onClick={() => {
                      tangTienCuoc('ca', 1000)
                    }}>+</Button>
                </div>
                <div className='col-span-1  flex justify-between w-10'>
                    <Button onClick={() => {
                      giamTienCuoc('cua', 1000)
                    }}>-</Button>
                    <p>{tienDatCuoc.cua}</p>
                    <Button onClick={() => {
                      tangTienCuoc('cua', 1000)
                    }}>+</Button>
                </div>

            </div>
        </div>

        <div>
            <h1 className='text-3xl font-bold'>BAU CUA GAME</h1>
            <p>Your cash: {yourCash}</p>
            <Button onClick={runPlay}>Run</Button>
            <div>
                <p>Xuc xac 1: {xucxac[ketQua.ss1]}</p>
                <p>Xuc xac 2: {xucxac[ketQua.ss2]}</p>
                <p>Xuc xac 3: {xucxac[ketQua.ss3]}</p>
            </div>
        </div>
    </div>
  )
}

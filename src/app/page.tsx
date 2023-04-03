"use client";
import Image from 'next/image'
import Link from 'next/link';
import * as React from 'react';

export default function Home() {
  const [data, setData] = React.useState<any>()
  const [isLoading, setLoading] = React.useState(true)
  const [isError, setIsError] = React.useState(false)
  const [query, setQuery] = React.useState('')

  React.useEffect(() => {
    setLoading(true)
    initQuery()
  }, [])
  function initQuery() {
    fetch('https://rickandmortyapi.com/api/character')
      .then((res) => res?.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }
  function querying(query: string) {
    setLoading(true)
    fetch(`https://rickandmortyapi.com/api/character/?name=${query}`)
      .then((res) =>
        res?.json()
      )
      .then((data) => {
        if (data.error) {
          setIsError(true);
          return data.error
        } else {
          setData(data)
          if (!!data) {
            setLoading(false)
            setIsError(false)
          } else {
            setTimeout(() => {
              initQuery()
            }, 5000);
          }
        }
      })
  }
  return (
    <>
      <main>
        <header>
          <Image src={'/ramLogo.svg'} alt={'ramLogo'} width={600} height={200}></Image>
        </header>

        <nav>
          <Image src={'/search.svg'} alt={'searchButt'} width={17.49} height={17.49}></Image>
          <input type="text" id="search" name="name" placeholder='Filter by names...' onChange={(e: any) => {
            setQuery(e.target.value); console.log(e.target.value); querying(query)
          }
          }
          />
        </nav>
        <section>
          {
            !isLoading ?
              data.results?.map((el: any) => (
                <Link key={el.id} href={`http://localhost:3000/details/${el.id}`}>
                  <div className='homeSubject'>
                    <Image src={el.image} alt={'searchButt'} width={240} height={168} loading={'lazy'}></Image>
                    <div className='homeSubjDetails'>
                      <div className='homeName'><h3>{el.name}</h3></div>
                      <div className='homeSpecies'>{el.species}</div>
                    </div>
                  </div>
                </Link>)) :
              isError ?
                <>No such chars in Rick and Morty show</> :
                <p>loading</p>
          }
        </section>
        <section>

        </section>
      </main>
    </>
  )
}

import React, { useEffect, useState } from "react"

type User = {
  id: number
  name: string
  email: string
  age: number
  profilePicture: string
}

const UserCard = () => {

  const [searchUser, setSearchUser] = useState("")
  const [users, setUsers] = useState<User[]>()
  const [user, setUser] = useState<User|null>()
  const [error, setError] = useState("")
  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value)
  }
  const fetchUsers = async () => {
    try {
      const res = await fetch('/users.json')
      if (!res.ok) {
        throw new Error
      }
      const data = await res.json()
      setUsers(data.users)
      console.log(users)
    } catch (error) {
      console.error(error)
    }
  }

  const findUser = () => {
    const found = users?.find(u => u.name.toLowerCase().includes(searchUser.toLowerCase()))
    if (found) {
      setUser(found)
      setError("")
    } else {
      setUser(null)
      setError("No user found with the given name")
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  

  return (
    <div className="user-card">
      <div className="search-section">
        <label htmlFor="">Enter User Name</label>
        <input type="text" value={searchUser} onChange={handleSearch}/>
        <button onClick={findUser}>Search</button>
      </div>
      <div className="result-section">
        {error && <p>{error}</p>}
        {user && (
          <div className="user-info">
            <img src={user.profilePicture} alt="" className="profile"/>
            <div className="user-details">
              <p>ID: {user.id}</p>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Age: {user.age}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserCard
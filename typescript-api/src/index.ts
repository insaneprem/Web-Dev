interface User {
    id : string
    age : number,
    name : string,
    email : string,
    password : string
}

type UpdateProp = Pick<User , 'age' | 'name'>
type p=Partial<UpdateProp>
function sumOfAges(user1 :  p ,user2 : User){
    return (user1.age || 0) + user2.age
}

// console.log(sumOfAges({name : "insane",age :20} , {name : "prem" , age : 30}))


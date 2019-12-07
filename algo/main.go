package main

import (
	"fmt"
)

func main(){
	n := 4
	var ar = []int{31,28,31,30,31,30,31,31,30,31,30,31}
	factoriel(n)
	moyen(ar)
}

func factoriel(n int){
	f := 1
	
	for n != 1{
		f = n * f
		n = n - 1
	}

	fmt.Println("factoriel", f)

}

func moyen(array []int) {
	count := len(array)
	moy := 0

	for i:= 0; i < count; i++ {
		moy = array[i] + moy
	}

	fmt.Println("moyen du mois", moy / count)
}
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

func printer(){
	for i := 1; i <= 20; i++ {
		for j := 1; j <= 50; j++ {
			if j > i {
				for k := 1; k <= i; k ++ {
					fmt.Print("*")
				}
				break		
			} else {
				fmt.Print("*")
			}
		}
		
		fmt.Println("")	
	}

	for m := 1; m <= 5; m++ {
		for n := 1; n <= 25; n++ {
			if n >= 20 {
				fmt.Print("*")	
			} else {
				fmt.Print(" ")		
			}
		}
		
		fmt.Println("")	
	}
}
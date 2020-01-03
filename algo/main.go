package main

import (
	"fmt"
	// "bytes"
)

func main(){
	// n := 4
	// var ar = []int{31,28,31,30,31,30,31,31,30,31,30,31}
	// factoriel(n)
	// moyen(ar)
	aArr()
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

func puissance(){
	expo := 10
	val := 2
	puiss := 1

	for i := 0; i < expo; i ++ {
		puiss = val*puiss 
	}

	fmt.Println(puiss)
}

func chzx() {
	for i := 0; i < 3; i++ {
		defer fmt.Println(i)
	}
	fmt.Println("done")
}

func aPoint(){
	i := 42
	p := &i 
	*p = 33
	fmt.Println(i)
}

func aArr() {
	a := make([]int, 5)
	for i := 0; i<3; i++ {
		a[i] = i
	}

	fmt.Println(len(a),cap(a),a)
}
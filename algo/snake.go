package main

import (
	"fmt"
)

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

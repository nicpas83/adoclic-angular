import { Component, OnInit } from '@angular/core';
import { Subscription, forkJoin, interval, takeWhile } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';
import { JokeService } from 'src/app/services/joke.service';

@Component({
  selector: 'app-dog-joke',
  templateUrl: './dog-joke.component.html',
  styleUrls: ['./dog-joke.component.css']
})
export class DogJokeComponent implements OnInit{

  imageUrl!: string;
  setup!: string;
  punchline!: string;
  counter: number = 20;

  countDownSubscription: Subscription | undefined;

  constructor(
    private imageService: ImageService,
    private jokeService: JokeService
  ){}


  ngOnInit(): void {
    this.loadNewRandomJoke();
  }


  loadNewRandomJoke(){
    forkJoin([
      this.imageService.getRandomDogImage(),
      this.jokeService.getRandomJoke()
    ])
    .subscribe({
      next: ([ imageResponse, jokeResponse ]) => {
        this.imageUrl = imageResponse.message;
        this.setup = jokeResponse.setup;
        this.punchline = jokeResponse.punchline;

        this.startCountDown();
      },
      error: (error) => console.log(error)
    })
  }


  startCountDown(): void{

    this.counter = 20;

    if(this.countDownSubscription){
      this.countDownSubscription.unsubscribe();
    }

    const countDown$ = interval(1000).pipe(
      takeWhile(() => this.counter > 0)
    )

    this.countDownSubscription = countDown$.subscribe(() => {
      this.counter--;
      if(this.counter === 0) this.loadNewRandomJoke()
    })

  }



}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Launch } from '../launch.model';
import { SpaceXService } from '../spacex-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  dataSubscription: Subscription;
  paramsSubscription: Subscription;
  data: Launch[];
  years: number[];

  selectedYear: number;
  isSuccessfulLaunch: boolean;
  isSuccessfulLanding: boolean;
  isLoading: boolean;

  constructor(private spaceXService: SpaceXService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.years = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.selectedYear = params.year !== 'undefined' && params.year !== 'NaN' ? +params.year : undefined;
      this.isSuccessfulLaunch = this.parseBooleanString(params.successfulLaunch);
      this.isSuccessfulLanding = this.parseBooleanString(params.successfulLanding);
      this.loadLaunches(this.selectedYear, this.isSuccessfulLaunch, this.isSuccessfulLanding);
    });
  }

  private parseBooleanString(str: string): boolean {
    if (str === 'undefined' || str === undefined) {
      return undefined;
    } else if (str === 'true') {
      return true;
    } else if (str === 'false') {
      return false;
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    this.dataSubscription.unsubscribe();
  }

  toggleFilter(filterName: string, value: any): void {
    switch (filterName) {
      case 'year': {
        if (value === this.selectedYear) {
          this.selectedYear = undefined;
        } else {
          this.selectedYear = value;
        }
        break;
      }
      case 'launch': {
        if (value === this.isSuccessfulLaunch) {
          this.isSuccessfulLaunch = undefined;
        } else {
          this.isSuccessfulLaunch = value;
        }
        break;
      }
      case 'landing': {
        if (value === this.isSuccessfulLanding) {
          this.isSuccessfulLanding = undefined;
        } else {
          this.isSuccessfulLanding = value;
        }
        break;
      }
    }
    this.navigate();
  }

  loadLaunches(year: number, launchSuccess: boolean, landSuccess: boolean): void {
    this.isLoading = true;
    this.dataSubscription = this.spaceXService.getLaunches(year, launchSuccess, landSuccess).subscribe(response => {
      this.data = response;
      this.isLoading = false;
    }, _ => this.isLoading = false);
  }

  navigate(): void {
    this.router.navigate(['/', `${this.selectedYear}`, `${this.isSuccessfulLaunch}`, `${this.isSuccessfulLanding}`]);
  }

}

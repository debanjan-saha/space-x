import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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

  ngOnInit() {
    this.years = [ 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.selectedYear = params.year !== 'undefined' ? +params.year : undefined;
      this.isSuccessfulLaunch = this.parseBooleanString(params.successfulLaunch);
      this.isSuccessfulLanding = this.parseBooleanString(params.successfulLanding);
      this.loadLaunches(this.selectedYear, this.isSuccessfulLaunch, this.isSuccessfulLanding);
    });
  }

  private parseBooleanString(str: string) {
    if (str === 'undefined' || str === 'false') {
      return false;
    } else if (str === 'true') {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.dataSubscription.unsubscribe();
  }

  loadLaunches(year: number, launchSuccess: boolean, landSuccess: boolean) {
    this.isLoading = true;
    this.dataSubscription = this.spaceXService.getLaunches(year, launchSuccess, landSuccess).subscribe(response => {
      this.data = response;
      this.isLoading = false;
    }, _ => this.isLoading = false);
  }

  navigate(year: number) {
    if (year === this.selectedYear) {
      this.selectedYear = undefined;
      this.router.navigateByUrl(`/${this.isSuccessfulLaunch}/${this.isSuccessfulLaunch}`);
    } else {
      this.selectedYear = year;
      this.router.navigateByUrl(`/${this.selectedYear}/${this.isSuccessfulLaunch}/${this.isSuccessfulLaunch}`);
    }
  }

}

export interface Launch {
  crew: string;
  details: string;
  flight_number: number;
  is_tentative: boolean;
  launch_date_local: string;
  launch_date_unix: number;
  launch_date_utc: string;
  launch_failure_details: { time: 33, altitude: null, reason: string; };
  launch_site: {
    site_id: string;
    site_name: string;
    site_name_long: string;
  };
  launch_success: boolean;
  launch_window: number;
  launch_year: string;
  links: {
    mission_patch: string;
    mission_patch_small: string;
  };
  mission_id: any[];
  mission_name: string;
  ships: any[];
  static_fire_date_unix: number;
  static_fire_date_utc: string;
  tbd: boolean;
  telemetry: { flight_club: any; };
  tentative_max_precision: string;
  timeline: { webcast_liftoff: number; };
  upcoming: boolean;
}

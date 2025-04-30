export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

// export interface Construction {
//     id: number;
//     title: string
//     fiscalYear: number;
//     description: string;
//     startDate: string;
//     estimatedCompletionDate: string;
//     endDate?: string;
//     status: 'not_yet_started' | 'ongoing' | 'completed' | 'delayed';
//     user_id: number;
//     equipment? :Equipment[];
//     report?: Report[];
//     approve_reports?: ApproveReport[];
//     created_at?: string;
//     updated_at?: string;
//     equipment_ids: number[];
// }
export interface Construction {
  id: number;
  title: string;
  fiscalYear: number;
  description: string;
  startDate: string;
  estimatedCompletionDate: string;
  endDate?: string;
  status: 'not_yet_started' | 'ongoing' | 'completed' | 'delayed';
  user_id: number;
  equipment_ids: number[];
  work_log?: WorkLog[];
  report?: {
    id: number;
    inspection_details: string;
    concerns?: string;
    construction_id: number;
    created_at?: string;
    updated_at?: string;
    construction?: Construction;
    approve_items: {
      id: number;
      name: string;
      approve_id: number;
      user_id: number;
      created_at?: string;
      updated_at?: string;
      approve?: Approve;
      pivot: {
        report_id: number;
        approve_item_id: number;
        status: 'approved' | 'pending' | 'rejected';
      };
    }[];
    approve_reports?: ApproveReport[];
  }[];
  created_at?: string;
  updated_at?: string;
}

export interface Equipment {
    id: number;
    name: string;
    model: string;
    serialNumber: string;
    manufacturer: string;
    status: 'available' | 'emergency_reserve' | 'maintenance';
    equipment_category_id: number;
    created_at?: string;
    updated_at?: string;
}

export interface EquipmentCategory {
    id: number;
    name: string;
    description: string;
    equipment?: Equipment[];
    created_at?: string;
    updated_at?: string;
}

export interface InspectionTemplate {
  id: number;
  name: string;
  description?: string;
  equipment_category_id: number;
  inspection_template_items: {
    id: number;
    field_name: string;
    type: 'visual' | 'measurement' | 'functional';
    unit: string;
    min_value: number | null;
    max_value: number | null;
  }[];
  created_at?: string;
  updated_at?: string;
}
  
export interface CheckItem {
  id: number;
  description: string;
  type: 'visual' | 'measurement' | 'functional';
  required: boolean;
  min_value?: number;
  max_value?: number;
  unit?: string;
}
  
export interface EquipmentRecord {
  id: number;
  equipment_id: number;
  template_id: number;
  recorded_at: string;
  start_time: string;
  end_time: string;
  created_by_id: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  record_items: EquipmentRecordItem[];
}

export interface EquipmentRecordItem {
  id: number;
  record_id: number;
  template_item_id: number;
  time: string;
  value: number;
  created_at?: string;
  updated_at?: string;
}

export interface Report {
  id: number;
  inspection_details: string;
  concerns?: string;
  construction_id: number;
  created_at?: string;
  updated_at?: string;
  construction?: Construction;
  approve_items: {
    id: number;
    name: string;
    approve_id: number;
    user_id: number;
    created_at?: string;
    updated_at?: string;
    approve?: Approve;
    pivot: {
      report_id: number;
      approve_item_id: number;
      status: 'approved' | 'pending' | 'rejected';
    };
  }[];
  approve_reports?: ApproveReport[]; // 中間テーブルへの参照
}

export interface Approve {
  id: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  approve_items?: ApproveItem[];
}

export interface ApproveItem {
  id: number;
  name: string;
  approve_id: number;
  user_id: number;
  created_at?: string;
  updated_at?: string;
  approve?: Approve;
  user?: User;
  reports?: Report[]; // 多対多の関係を反映
  approve_reports?: ApproveReport[]; // 中間テーブルへの参照
}

export interface ApproveReport {
  id: number;
  report_id: number;
  approve_item_id: number;
  status: 'approved' | 'pending' | 'rejected';
  created_at?: string;
  updated_at?: string;
  approve_item?: ApproveItem;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface WorkLog {
  id: number;
  title: string;
  user_id: number;
  diaryDate: string
  construction_through_work_records?: {
    id: number;
    title: string;
    pivot: {
      work_detail: string;
      working_date: string;
    };
  }[];
  construction_through_work_schedules?: {
    id: number;
    title: string;
    pivot: {
      work_detail: string;
      schedule_work_date: string;
    };
  }[];
  user?: User;
  created_at?: string;
  updated_at?: string;
}

export interface WorkRecord {
  id: number;
  construction_id: number;
  work_log_id: number;
  workingDate: string;
  work_detail: string;
  created_at?: string;
  updated_at?: string;
}

export interface WorkSchedule {
  id: number;
  construction_id: number;
  work_log_id: number;
  scheduleWorkDate: string;
  work_detail: string;
  created_at?: string;
  updated_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

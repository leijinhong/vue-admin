import { MockMethod } from "vite-plugin-mock";

export default [
  // 审批流
  {
    url: "/admin/role/select",
    method: "get",
    response: () => {
      const LENGTH = 19;
      return {
        code: 0,
        data: {
          items: [
            {
              id: 1,
              name: "超级管理员",
              rules: "*",
              created_at: "2022-08-13 16:15:01",
              updated_at: "2022-12-23 12:05:07",
              pid: 0
            },
            {
              id: 21,
              name: "财务经理",
              rules:
                "14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,72,73,74,75,78,79,80,81,83,84,85,86,87,88,89,91,92,93,94,97,98,99,100,102,103,104,105,108,109,110,111,112,113,115,116,117,118,120,121,122,123,124,126,127,128,129,132,133,134,135,137,138,139,140,143,144,145,146,148,149,150,151,153,154,155,156,159,160,161,162,164,165,166,167,169,170,171,172,173,174,175,176,178,179,180,181,183,184,185,186,189,193,194,195,196,198,199,200,201,203,204,205,206,207,208,212,214,215,218,273,274,279,284,285,286,287,293,294,295,296,300,301,302,303,306,307,308,309,313,314,315,316,320,321,322,323,327,328,329,330,333,334,337,338,339,341,342,343,344,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,366,367,368,369,371,372,373,374,376,377,378,379,381,382,383,384,400,401,408,409,410,411,414,415,416,417,419,420,421,422,431,432,433,434,435,438,439,440,441,442,443,445,446,447,449,450,451,452,454,455,456,457,458,460,461,462,463,465,466,467,468,469,470,472,473,474,475,477,478,479,480,481,483,484,485,486,487,488",
              created_at: "2023-09-21 15:14:01",
              updated_at: "2023-09-21 17:31:28",
              pid: 31
            },
            {
              id: 22,
              name: "市场部总经理",
              rules:
                "14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,72,73,74,75,78,79,80,81,83,84,85,86,87,88,89,91,92,93,94,97,98,99,100,102,103,104,105,108,109,110,111,112,113,115,116,117,118,120,121,122,123,124,126,127,128,129,132,133,134,135,137,138,139,140,143,144,145,146,148,149,150,151,153,154,155,156,159,160,161,162,164,165,166,167,169,170,171,172,173,174,175,176,178,179,180,181,183,184,185,186,189,193,194,195,196,198,199,200,201,203,204,205,206,207,208,212,214,215,218,273,274,279,284,285,286,287,293,294,295,296,300,301,302,303,306,307,308,309,313,314,315,316,320,321,322,323,327,328,329,330,333,334,337,338,339,341,342,343,344,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,366,367,368,369,371,372,373,374,376,377,378,379,381,382,383,384,400,401,408,409,410,411,414,415,416,417,419,420,421,422,431,432,433,434,435,438,439,440,441,442,443,445,446,447,449,450,451,452,454,455,456,457,458,460,461,462,463,465,466,467,468,469,470,472,473,474,475,477,478,479,480,481,483,484,485,486,487,488",
              created_at: "2023-09-21 15:14:27",
              updated_at: "2023-09-21 17:20:31",
              pid: 28
            },
            {
              id: 23,
              name: "奥联集团",
              rules:
                "14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,72,73,74,75,78,79,80,81,83,84,85,86,87,88,89,91,92,93,94,97,98,99,100,102,103,104,105,108,109,110,111,112,113,115,116,117,118,120,121,122,123,124,126,127,128,129,132,133,134,135,137,138,139,140,143,144,145,146,148,149,150,151,153,154,155,156,159,160,161,162,164,165,166,167,169,170,171,172,173,174,175,176,178,179,180,181,183,184,185,186,189,193,194,195,196,198,199,200,201,203,204,205,206,207,208,212,214,215,218,273,274,279,284,285,286,287,293,294,295,296,300,301,302,303,306,307,308,309,313,314,315,316,320,321,322,323,327,328,329,330,333,334,337,338,339,341,342,343,344,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,366,367,368,369,371,372,373,374,376,377,378,379,381,382,383,384,400,401,408,409,410,411,414,415,416,417,419,420,421,422,431,432,433,434,435,438,439,440,441,442,443,445,446,447,449,450,451,452,454,455,456,457,458,460,461,462,463,465,466,467,468,469,470,472,473,474,475,477,478,479,480,481,483,484,485,486,487,488",
              created_at: "2023-09-21 17:13:07",
              updated_at: "2023-09-21 17:13:07",
              pid: 1
            },
            {
              id: 24,
              name: "深圳奥联",
              rules:
                "14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,72,73,74,75,78,79,80,81,83,84,85,86,87,88,89,91,92,93,94,97,98,99,100,102,103,104,105,108,109,110,111,112,113,115,116,117,118,120,121,122,123,124,126,127,128,129,132,133,134,135,137,138,139,140,143,144,145,146,148,149,150,151,153,154,155,156,159,160,161,162,164,165,166,167,169,170,171,172,173,174,175,176,178,179,180,181,183,184,185,186,189,193,194,195,196,198,199,200,201,203,204,205,206,207,208,212,214,215,218,273,274,279,284,285,286,287,293,294,295,296,300,301,302,303,306,307,308,309,313,314,315,316,320,321,322,323,327,328,329,330,333,334,337,338,339,341,342,343,344,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,366,367,368,369,371,372,373,374,376,377,378,379,381,382,383,384,400,401,408,409,410,411,414,415,416,417,419,420,421,422,431,432,433,434,435,438,439,440,441,442,443,445,446,447,449,450,451,452,454,455,456,457,458,460,461,462,463,465,466,467,468,469,470,472,473,474,475,477,478,479,480,481,483,484,485,486,487,488",
              created_at: "2023-09-21 17:13:44",
              updated_at: "2023-09-21 17:13:44",
              pid: 23
            },
            {
              id: 25,
              name: "总裁办",
              rules:
                "14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,72,73,74,75,78,79,80,81,83,84,85,86,87,88,89,91,92,93,94,97,98,99,100,102,103,104,105,108,109,110,111,112,113,115,116,117,118,120,121,122,123,124,126,127,128,129,132,133,134,135,137,138,139,140,143,144,145,146,148,149,150,151,153,154,155,156,159,160,161,162,164,165,166,167,169,170,171,172,173,174,175,176,178,179,180,181,183,184,185,186,189,193,194,195,196,198,199,200,201,203,204,205,206,207,208,212,214,215,218,273,274,279,284,285,286,287,293,294,295,296,300,301,302,303,306,307,308,309,313,314,315,316,320,321,322,323,327,328,329,330,333,334,337,338,339,341,342,343,344,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,366,367,368,369,371,372,373,374,376,377,378,379,381,382,383,384,400,401,408,409,410,411,414,415,416,417,419,420,421,422,431,432,433,434,435,438,439,440,441,442,443,445,446,447,449,450,451,452,454,455,456,457,458,460,461,462,463,465,466,467,468,469,470,472,473,474,475,477,478,479,480,481,483,484,485,486,487,488",
              created_at: "2023-09-21 17:14:03",
              updated_at: "2023-09-21 17:14:03",
              pid: 23
            },
            {
              id: 26,
              name: "北京奥联",
              rules:
                "14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,72,73,74,75,78,79,80,81,83,84,85,86,87,88,89,91,92,93,94,97,98,99,100,102,103,104,105,108,109,110,111,112,113,115,116,117,118,120,121,122,123,124,126,127,128,129,132,133,134,135,137,138,139,140,143,144,145,146,148,149,150,151,153,154,155,156,159,160,161,162,164,165,166,167,169,170,171,172,173,174,175,176,178,179,180,181,183,184,185,186,189,193,194,195,196,198,199,200,201,203,204,205,206,207,208,212,214,215,218,273,274,279,284,285,286,287,293,294,295,296,300,301,302,303,306,307,308,309,313,314,315,316,320,321,322,323,327,328,329,330,333,334,337,338,339,341,342,343,344,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,366,367,368,369,371,372,373,374,376,377,378,379,381,382,383,384,400,401,408,409,410,411,414,415,416,417,419,420,421,422,431,432,433,434,435,438,439,440,441,442,443,445,446,447,449,450,451,452,454,455,456,457,458,460,461,462,463,465,466,467,468,469,470,472,473,474,475,477,478,479,480,481,483,484,485,486,487,488",
              created_at: "2023-09-21 17:14:15",
              updated_at: "2023-09-21 17:14:15",
              pid: 23
            },
            {
              id: 27,
              name: "西安奥联",
              rules:
                "14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,72,73,74,75,78,79,80,81,83,84,85,86,87,88,89,91,92,93,94,97,98,99,100,102,103,104,105,108,109,110,111,112,113,115,116,117,118,120,121,122,123,124,126,127,128,129,132,133,134,135,137,138,139,140,143,144,145,146,148,149,150,151,153,154,155,156,159,160,161,162,164,165,166,167,169,170,171,172,173,174,175,176,178,179,180,181,183,184,185,186,189,193,194,195,196,198,199,200,201,203,204,205,206,207,208,212,214,215,218,273,274,279,284,285,286,287,293,294,295,296,300,301,302,303,306,307,308,309,313,314,315,316,320,321,322,323,327,328,329,330,333,334,337,338,339,341,342,343,344,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,366,367,368,369,371,372,373,374,376,377,378,379,381,382,383,384,400,401,408,409,410,411,414,415,416,417,419,420,421,422,431,432,433,434,435,438,439,440,441,442,443,445,446,447,449,450,451,452,454,455,456,457,458,460,461,462,463,465,466,467,468,469,470,472,473,474,475,477,478,479,480,481,483,484,485,486,487,488",
              created_at: "2023-09-21 17:14:29",
              updated_at: "2023-09-21 17:14:29",
              pid: 23
            },
            {
              id: 28,
              name: "中央市场部",
              rules:
                "14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,72,73,74,75,78,79,80,81,83,84,85,86,87,88,89,91,92,93,94,97,98,99,100,102,103,104,105,108,109,110,111,112,113,115,116,117,118,120,121,122,123,124,126,127,128,129,132,133,134,135,137,138,139,140,143,144,145,146,148,149,150,151,153,154,155,156,159,160,161,162,164,165,166,167,169,170,171,172,173,174,175,176,178,179,180,181,183,184,185,186,189,193,194,195,196,198,199,200,201,203,204,205,206,207,208,212,214,215,218,273,274,279,284,285,286,287,293,294,295,296,300,301,302,303,306,307,308,309,313,314,315,316,320,321,322,323,327,328,329,330,333,334,337,338,339,341,342,343,344,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,366,367,368,369,371,372,373,374,376,377,378,379,381,382,383,384,400,401,408,409,410,411,414,415,416,417,419,420,421,422,431,432,433,434,435,438,439,440,441,442,443,445,446,447,449,450,451,452,454,455,456,457,458,460,461,462,463,465,466,467,468,469,470,472,473,474,475,477,478,479,480,481,483,484,485,486,487,488",
              created_at: "2023-09-21 17:14:43",
              updated_at: "2023-09-21 17:14:43",
              pid: 24
            },
            {
              id: 29,
              name: "解决方案部",
              rules:
                "14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,72,73,74,75,78,79,80,81,83,84,85,86,87,88,89,91,92,93,94,97,98,99,100,102,103,104,105,108,109,110,111,112,113,115,116,117,118,120,121,122,123,124,126,127,128,129,132,133,134,135,137,138,139,140,143,144,145,146,148,149,150,151,153,154,155,156,159,160,161,162,164,165,166,167,169,170,171,172,173,174,175,176,178,179,180,181,183,184,185,186,189,193,194,195,196,198,199,200,201,203,204,205,206,207,208,212,214,215,218,273,274,279,284,285,286,287,293,294,295,296,300,301,302,303,306,307,308,309,313,314,315,316,320,321,322,323,327,328,329,330,333,334,337,338,339,341,342,343,344,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,366,367,368,369,371,372,373,374,376,377,378,379,381,382,383,384,400,401,408,409,410,411,414,415,416,417,419,420,421,422,431,432,433,434,435,438,439,440,441,442,443,445,446,447,449,450,451,452,454,455,456,457,458,460,461,462,463,465,466,467,468,469,470,472,473,474,475,477,478,479,480,481,483,484,485,486,487,488",
              created_at: "2023-09-21 17:15:00",
              updated_at: "2023-09-21 17:15:06",
              pid: 24
            },
            {
              id: 30,
              name: "用户服务部",
              rules:
                "14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,72,73,74,75,78,79,80,81,83,84,85,86,87,88,89,91,92,93,94,97,98,99,100,102,103,104,105,108,109,110,111,112,113,115,116,117,118,120,121,122,123,124,126,127,128,129,132,133,134,135,137,138,139,140,143,144,145,146,148,149,150,151,153,154,155,156,159,160,161,162,164,165,166,167,169,170,171,172,173,174,175,176,178,179,180,181,183,184,185,186,189,193,194,195,196,198,199,200,201,203,204,205,206,207,208,212,214,215,218,273,274,279,284,285,286,287,293,294,295,296,300,301,302,303,306,307,308,309,313,314,315,316,320,321,322,323,327,328,329,330,333,334,337,338,339,341,342,343,344,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,366,367,368,369,371,372,373,374,376,377,378,379,381,382,383,384,400,401,408,409,410,411,414,415,416,417,419,420,421,422,431,432,433,434,435,438,439,440,441,442,443,445,446,447,449,450,451,452,454,455,456,457,458,460,461,462,463,465,466,467,468,469,470,472,473,474,475,477,478,479,480,481,483,484,485,486,487,488",
              created_at: "2023-09-21 17:15:30",
              updated_at: "2023-09-21 17:15:30",
              pid: 24
            },
            {
              id: 31,
              name: "财务管理部",
              rules:
                "14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,72,73,74,75,78,79,80,81,83,84,85,86,87,88,89,91,92,93,94,97,98,99,100,102,103,104,105,108,109,110,111,112,113,115,116,117,118,120,121,122,123,124,126,127,128,129,132,133,134,135,137,138,139,140,143,144,145,146,148,149,150,151,153,154,155,156,159,160,161,162,164,165,166,167,169,170,171,172,173,174,175,176,178,179,180,181,183,184,185,186,189,193,194,195,196,198,199,200,201,203,204,205,206,207,208,212,214,215,218,273,274,279,284,285,286,287,293,294,295,296,300,301,302,303,306,307,308,309,313,314,315,316,320,321,322,323,327,328,329,330,333,334,337,338,339,341,342,343,344,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,366,367,368,369,371,372,373,374,376,377,378,379,381,382,383,384,400,401,408,409,410,411,414,415,416,417,419,420,421,422,431,432,433,434,435,438,439,440,441,442,443,445,446,447,449,450,451,452,454,455,456,457,458,460,461,462,463,465,466,467,468,469,470,472,473,474,475,477,478,479,480,481,483,484,485,486,487,488",
              created_at: "2023-09-21 17:15:48",
              updated_at: "2023-09-21 17:15:48",
              pid: 24
            },
            {
              id: 32,
              name: "客户经理",
              rules:
                "25,26,28,29,31,36,37,38,39,72,73,74,78,79,80,83,84,85,87,88,89,91,92,93,97,98,99,102,103,104,108,109,110,111,112,115,116,117,120,121,122,124,126,127,128,132,133,134,137,138,139,143,144,145,148,149,150,153,154,155,159,160,161,164,165,166,169,170,171,173,174,175,178,179,180,183,184,185,193,194,195,198,199,200,203,204,205,207,208,212,214,218,273,274,279,284,285,286,306,307,308,313,314,315,320,321,322,327,328,329,333,334,337,338,339,341,342,343,346,347,348,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,366,367,368,371,372,373,376,377,378,381,382,383,400,401,408,409,410,414,415,416,419,420,421,431,432,433,435,438,439,440,441,449,450,451,454,455,456,457,460,461,462,465,466,467,469,470,472,473,474,477,478,479,481,483,484,485,487,488",
              created_at: "2023-09-21 17:17:40",
              updated_at: "2023-09-22 09:19:35",
              pid: 22
            },
            {
              id: 33,
              name: "市场部总裁",
              rules:
                "25,26,27,28,29,30,31,36,37,38,39,40,72,73,74,75,78,79,80,81,83,84,85,86,87,88,89,91,92,93,94,97,98,99,100,102,103,104,105,108,109,110,111,112,113,115,116,117,118,120,121,122,123,124,126,127,128,129,132,133,134,135,137,138,139,140,143,144,145,146,148,149,150,151,153,154,155,156,159,160,161,162,164,165,166,167,169,170,171,172,173,174,175,176,178,179,180,181,183,184,185,186,193,194,195,196,198,199,200,201,203,204,205,206,207,208,212,214,215,218,273,274,279,284,285,286,287,306,307,308,309,313,314,315,316,320,321,322,323,327,328,329,330,333,334,337,338,339,341,342,343,344,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,366,367,368,369,371,372,373,374,376,377,378,379,381,382,383,384,400,401,408,409,410,411,414,415,416,417,419,420,421,422,431,432,433,434,435,438,439,440,441,442,449,450,451,452,454,455,456,457,458,460,461,462,463,465,466,467,468,469,470,472,473,474,475,477,478,479,480,481,483,484,485,486,487,488",
              created_at: "2023-09-21 17:18:26",
              updated_at: "2023-09-22 09:20:38",
              pid: 25
            },
            {
              id: 34,
              name: "解决方案部总经理",
              rules:
                "14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,72,73,74,75,78,79,80,81,83,84,85,86,87,88,89,91,92,93,94,97,98,99,100,102,103,104,105,108,109,110,111,112,113,115,116,117,118,120,121,122,123,124,126,127,128,129,132,133,134,135,137,138,139,140,143,144,145,146,148,149,150,151,153,154,155,156,159,160,161,162,164,165,166,167,169,170,171,172,173,174,175,176,178,179,180,181,183,184,185,186,189,193,194,195,196,198,199,200,201,203,204,205,206,207,208,212,214,215,218,273,274,279,284,285,286,287,293,294,295,296,300,301,302,303,306,307,308,309,313,314,315,316,320,321,322,323,327,328,329,330,333,334,337,338,339,341,342,343,344,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,366,367,368,369,371,372,373,374,376,377,378,379,381,382,383,384,400,401,408,409,410,411,414,415,416,417,419,420,421,422,431,432,433,434,435,438,439,440,441,442,443,445,446,447,449,450,451,452,454,455,456,457,458,460,461,462,463,465,466,467,468,469,470,472,473,474,475,477,478,479,480,481,483,484,485,486,487,488",
              created_at: "2023-09-21 17:20:23",
              updated_at: "2023-09-21 17:20:23",
              pid: 29
            },
            {
              id: 41,
              name: "产品经理",
              rules:
                "14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,72,73,74,75,78,79,80,81,83,84,85,86,87,88,89,91,92,93,94,97,98,99,100,102,103,104,105,108,109,110,111,112,113,115,116,117,118,120,121,122,123,124,126,127,128,129,132,133,134,135,137,138,139,140,143,144,145,146,148,149,150,151,153,154,155,156,159,160,161,162,164,165,166,167,169,170,171,172,173,174,175,176,178,179,180,181,183,184,185,186,189,193,194,195,196,198,199,200,201,203,204,205,206,207,208,212,214,215,218,273,274,279,284,285,286,287,293,294,295,296,300,301,302,303,306,307,308,309,313,314,315,316,320,321,322,323,327,328,329,330,333,334,337,338,339,341,342,343,344,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,366,367,368,369,371,372,373,374,376,377,378,379,381,382,383,384,400,401,408,409,410,411,414,415,416,417,419,420,421,422,431,432,433,434,435,438,439,440,441,442,443,445,446,447,449,450,451,452,454,455,456,457,458,460,461,462,463,465,466,467,468,469,470,472,473,474,475,477,478,479,480,481,483,484,485,486,487,488",
              created_at: "2023-09-21 17:32:26",
              updated_at: "2023-09-21 17:32:26",
              pid: 34
            },
            {
              id: 42,
              name: "技术经理",
              rules:
                "14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,72,73,74,75,78,79,80,81,83,84,85,86,87,88,89,91,92,93,94,97,98,99,100,102,103,104,105,108,109,110,111,112,113,115,116,117,118,120,121,122,123,124,126,127,128,129,132,133,134,135,137,138,139,140,143,144,145,146,148,149,150,151,153,154,155,156,159,160,161,162,164,165,166,167,169,170,171,172,173,174,175,176,178,179,180,181,183,184,185,186,189,193,194,195,196,198,199,200,201,203,204,205,206,207,208,212,214,215,218,273,274,279,284,285,286,287,293,294,295,296,300,301,302,303,306,307,308,309,313,314,315,316,320,321,322,323,327,328,329,330,333,334,337,338,339,341,342,343,344,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,366,367,368,369,371,372,373,374,376,377,378,379,381,382,383,384,400,401,408,409,410,411,414,415,416,417,419,420,421,422,431,432,433,434,435,438,439,440,441,442,443,445,446,447,449,450,451,452,454,455,456,457,458,460,461,462,463,465,466,467,468,469,470,472,473,474,475,477,478,479,480,481,483,484,485,486,487,488",
              created_at: "2023-09-21 17:32:37",
              updated_at: "2023-09-21 17:32:37",
              pid: 34
            },
            {
              id: 43,
              name: "项目经理",
              rules:
                "14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,72,73,74,75,78,79,80,81,83,84,85,86,87,88,89,91,92,93,94,97,98,99,100,102,103,104,105,108,109,110,111,112,113,115,116,117,118,120,121,122,123,124,126,127,128,129,132,133,134,135,137,138,139,140,143,144,145,146,148,149,150,151,153,154,155,156,159,160,161,162,164,165,166,167,169,170,171,172,173,174,175,176,178,179,180,181,183,184,185,186,189,193,194,195,196,198,199,200,201,203,204,205,206,207,208,212,214,215,218,273,274,279,284,285,286,287,293,294,295,296,300,301,302,303,306,307,308,309,313,314,315,316,320,321,322,323,327,328,329,330,333,334,337,338,339,341,342,343,344,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,366,367,368,369,371,372,373,374,376,377,378,379,381,382,383,384,400,401,408,409,410,411,414,415,416,417,419,420,421,422,431,432,433,434,435,438,439,440,441,442,443,445,446,447,449,450,451,452,454,455,456,457,458,460,461,462,463,465,466,467,468,469,470,472,473,474,475,477,478,479,480,481,483,484,485,486,487,488",
              created_at: "2023-09-21 17:32:50",
              updated_at: "2023-09-21 17:32:50",
              pid: 30
            },
            {
              id: 44,
              name: "现场工程师",
              rules:
                "14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,72,73,74,75,78,79,80,81,83,84,85,86,87,88,89,91,92,93,94,97,98,99,100,102,103,104,105,108,109,110,111,112,113,115,116,117,118,120,121,122,123,124,126,127,128,129,132,133,134,135,137,138,139,140,143,144,145,146,148,149,150,151,153,154,155,156,159,160,161,162,164,165,166,167,169,170,171,172,173,174,175,176,178,179,180,181,183,184,185,186,189,193,194,195,196,198,199,200,201,203,204,205,206,207,208,212,214,215,218,273,274,279,284,285,286,287,293,294,295,296,300,301,302,303,306,307,308,309,313,314,315,316,320,321,322,323,327,328,329,330,333,334,337,338,339,341,342,343,344,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,366,367,368,369,371,372,373,374,376,377,378,379,381,382,383,384,400,401,408,409,410,411,414,415,416,417,419,420,421,422,431,432,433,434,435,438,439,440,441,442,443,445,446,447,449,450,451,452,454,455,456,457,458,460,461,462,463,465,466,467,468,469,470,472,473,474,475,477,478,479,480,481,483,484,485,486,487,488",
              created_at: "2023-09-21 17:33:02",
              updated_at: "2023-09-21 17:33:02",
              pid: 30
            }
          ],
          total: LENGTH
        },
        msg: ""
      };
    }
  }
] as MockMethod[];

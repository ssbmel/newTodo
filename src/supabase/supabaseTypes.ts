export interface Database {
  public: {
    Tables : {
      todos : {
        Row: {
          id : string;
          created_at: Date;
          contents: string;
          isDone: boolean;
        };
        // Insert: {

        // };
        // Update: {

        // };
      };
    };
  };
}
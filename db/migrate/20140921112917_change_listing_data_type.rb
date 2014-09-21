class ChangeListingDataType < ActiveRecord::Migration
   def up
       change_column :listings, :listing, :text
  end

  def down
    change_column :listings, :listing, :string
  end
end

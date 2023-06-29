class CornersController < ApplicationController
  before_action :set_corner, only: %i[ show edit update destroy ]

  # GET /corners or /corners.json
  def index
    @corners = Corner.all
  end

  # GET /corners/1 or /corners/1.json
  def show
  end

  # GET /corners/new
  def new
    @corner = Corner.new
  end

  # GET /corners/1/edit
  def edit
  end

  # POST /corners or /corners.json
  def create
    @corner = Corner.new(corner_params)

    respond_to do |format|
      if @corner.save
        format.html { redirect_to corner_url(@corner), notice: "Corner was successfully created." }
        format.json { render :show, status: :created, location: @corner }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @corner.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /corners/1 or /corners/1.json
  def update
    respond_to do |format|
      if @corner.update(corner_params)
        format.html { redirect_to corner_url(@corner), notice: "Corner was successfully updated." }
        format.json { render :show, status: :ok, location: @corner }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @corner.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /corners/1 or /corners/1.json
  def destroy
    @corner.destroy

    respond_to do |format|
      format.html { redirect_to corners_url, notice: "Corner was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_corner
      @corner = Corner.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def corner_params
      params.require(:corner).permit(:name, :velocity)
    end
end
